import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { waypoints = [], profile = "driving-car" } = await req.json();

    if (waypoints.length < 2) {
      return NextResponse.json(
        { error: "At least 2 waypoints required" },
        { status: 400 },
      );
    }

    const coordinates = waypoints.map(([lat, lon]: [number, number]) => [
      lon,
      lat,
    ]);

    const orsRes = await fetch(
      `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
      {
        method: "POST",
        headers: {
          Authorization: process.env.ORS_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates,
          instructions: false,
        }),
      },
    );

    if (!orsRes.ok) {
      const raw = await orsRes.text();
      return NextResponse.json(
        { error: "ORS request failed", status: orsRes.status, raw },
        { status: 500 },
      );
    }

    const data = await orsRes.json();

    return NextResponse.json({
      geometry: data.features[0].geometry,
      summary: data.features[0].properties.summary,
    });
  } catch (err: any) {
    console.error("API crash:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch route", details: err.message },
      { status: 500 },
    );
  }
}

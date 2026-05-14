import { NextRequest, NextResponse } from "next/server";
import { getPackageBySlugController } from "@/src/controllers/admin/packageControllers";

export async function  GET(req : NextRequest) {
    const slug = req.nextUrl.searchParams.get('slug');

    if(!slug){
        return NextResponse.json({success : false, message : "Missing Query Parameter"}, {status : 400});
    }

    return getPackageBySlugController(slug);

}
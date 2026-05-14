import { NextResponse } from "next/server";
import { getAdminPackagesService, createAdminPackageService, updateAdminPackagesService, getAdminPackageByIdService , getPackageBySlugServices, deleteAdminPackageService} from "@/src/services/admin/packageService";
import { tourPackageSchema } from "@/src/zodSchema/packageSchema";


// Get All
export async function getAdminToursController() {
  try {
    const tours = await getAdminPackagesService();

    return NextResponse.json({
      success: true,
      data: tours,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}


// Create
export async function createAdminTourController(req: Request) {
  try {
    const body = await req.json();

    const result = tourPackageSchema.safeParse(body);

    

    if(!result.success){
      console.log("Package Editor Error", result.error.flatten());
      return Response.json({
        success : false,
        errors : result.error.flatten()
      }, {status : 400})
    }

    const data = result.data;
    

    const tour = await createAdminPackageService(data);

    return NextResponse.json({
      success: true,
      data: tour,
    });

  } catch (error) {
    console.log("Error In Package", error);
    return NextResponse.json(
        
      { success: false, message: "Failed to create tour" },
      { status: 500 }
    );
  }
}


export async function updateAdminTourController(
  req: Request,
  params: { id: string }
) {
  try {
    const body = await req.json(); 
    const { id } = params; 
    
    if(!id){
       console.log("Id not commint");
       return;
    }

    const result = tourPackageSchema.safeParse(body);

    if(!result.success){
      console.log(result.error.flatten())
      return Response.json({
        success : false,
        errors : result.error.flatten()
      }, {status : 400})
    }

    const data = result.data;

    const updatedTour = await updateAdminPackagesService(id, data);

    return NextResponse.json({
      success: true,
      data: updatedTour,
    });

  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function deleteAdminTourController(
  req : Request,
  params : {id : string}){
    try {

      const {id} = params;

      const deltedTour = await  deleteAdminPackageService(id)

      return NextResponse.json({
         success : true,
         data : deltedTour
      });
      
    } catch (error) {
       console.log("error", error);
       return NextResponse.json({
         
         success : false , message : "Failed To Delete"
       }, {status : 500})
    }
}


export async function getAdminTourByIdController(params: { id: string }) {
  try {
    const { id } = params;

    const tour = await getAdminPackageByIdService(id);

    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tour,
    });

  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tour" },
      { status: 500 }
    );
  }
}

export async function getPackageBySlugController(slug : string){
    try {

      const tour = await getPackageBySlugServices(slug);
      
      if(!tour){
         return NextResponse.json({exists : false}, {status : 404});
      }

      return NextResponse.json({exists : true, data : tour}, {status : 200});
      
    } catch (error) {
       console.log("This is the error ", error);
       return NextResponse.json({message : "Something went Wrong!"},{status:500})
    }
}
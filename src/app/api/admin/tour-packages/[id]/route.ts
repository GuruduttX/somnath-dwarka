import { getAdminTourByIdController, updateAdminTourController, deleteAdminTourController } from "@/src/controllers/admin/packageControllers";

export async function PUT(
  req: Request,
   context : { params: Promise<{ id: string }> }
) {
   const params = await context.params;
   return await updateAdminTourController(req, params);
}

export async function DELETE(req : Request, context : {params : Promise<{id : string}>}) {
    const params = await context.params;
    return await deleteAdminTourController(req, params);
}

export async function GET(req : Request , context : {params : Promise<{id : string}>}) {
   const params = await context.params;
   return await getAdminTourByIdController(params);
}
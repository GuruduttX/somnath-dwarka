import { getUserHotelBySlugController } from "@/src/controllers/users/hotelControllers";
import { connectDB } from "@/src/lib/mongodb";


export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {

    try {

        await connectDB();

        const { slug } = await params;

        return getUserHotelBySlugController(slug);

    } catch (error) {
        
    }
}





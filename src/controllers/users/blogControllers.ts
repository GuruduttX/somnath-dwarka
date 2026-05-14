import {getUserAllBlogsService, getUserBlogBySlugService} from "@/src/services/users/blogServices";

import { NextResponse } from "next/server";

export const getUserAllBlogsController = async () => {

    try {

        const blogs = await getUserAllBlogsService();

        return NextResponse.json({
            success: true,
            data: blogs
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Users Blogs Not Found. There Are Some Errors"
        }, { status: 500 });

    }


};



export const getUserBlogBySlugController = async (slug : string) => {

    try {

        const blog = await getUserBlogBySlugService(slug);

        if (!blog) {
            return NextResponse.json({
                success: false,
                message: "Users Blog Not Found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: blog
        });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });

    }

};
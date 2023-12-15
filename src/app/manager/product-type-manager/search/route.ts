    import { productTypeService } from "@/domain/ModelService";
    import ProductType from "@/domain/models/ProductType";
    import { NextRequest, NextResponse } from "next/server";
    import ProductTypeData from "../aliases";

    export async function GET(request: NextRequest): Promise<Response> {
        //Get url search params
        const url: URLSearchParams = request.nextUrl.searchParams;

        //Get keyword 
        const keyword: string | null = url.get("key");

        //If keyword not null
        if (keyword != null) {
            //Create filter with reguler expression
            const path: any[] = [];
            const filter: any = {
                $or: [
                    { id: { $regex: new RegExp(keyword, 'i') } },
                    { name: { $regex: new RegExp(keyword, 'i') } }
                ]
            };

            //Getting product type list
            var productTypes: ProductType[] = await productTypeService.getByFilter(filter, path);

            //Converting product type list to data
            var productTypeData: ProductTypeData[] = productTypes.map(
                function (productType): ProductTypeData {
                    return {
                        id: productType.Id,
                        name: productType.Name
                    }
                }
            )
            
            //Return
            return NextResponse.json(
                {
                    success: true,
                    productTypes: productTypeData
                }
            )
        }

        return NextResponse.json(
            {
            }
        )
    }


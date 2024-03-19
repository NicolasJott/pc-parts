<?php

namespace App\Http\Controllers;


use App\Services\ProductService;
use App\Http\Resources\ProductResource;
use http\QueryString;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use OpenApi\Attributes as OAT;

class ProductController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param  ProductService  $orderService
     * @return void
     */
    public function __construct(private ProductService $productService)
    {
        //
    }

    /**
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/products',
        operationId: 'ProductController.readAll',
        summary: 'Read all products',
        security: [['BearerToken' => []]],
        tags: ['products'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/ProductResourceCollection'),
            ),
        ]
    )]
    public function readAll(): JsonResponse
    {
        return Response::json(ProductResource::collection($this->productService->getMulti()));
    }


    /**
     * Read by category
     *
     * @param Request $request
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/products/{category}',
        operationId: 'ProductController.readByCategory',
        summary: 'Read products by category',
        security: [['BearerToken' => []]],
        tags: ['products'],
        parameters: [
            new OAT\Parameter(
                name: 'category',
                in: 'path',
                required: true,
            ),
        ],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/ProductResourceCollection'),
            ),
        ]
    )]
    public function readByCategory(string $category): JsonResponse
    {
        $products = $this->productService->getByCategory($category);

        return Response::json(ProductResource::collection($products));
    }

    /**
     * Read by ID
     *
     * @param Request $request
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/products/{id}',
        operationId: 'ProductController.readById',
        summary: 'Read products by Id',
        security: [['BearerToken' => []]],
        tags: ['products'],
        parameters: [
            new OAT\Parameter(
                name: 'id',
                in: 'path',
                required: true,
            ),
        ],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/ProductResource'),
            ),
        ]
    )]
    public function readById(int $id): JsonResponse
    {
        $product = $this->productService->getById($id);

        return Response::json(new ProductResource($product));
    }
}

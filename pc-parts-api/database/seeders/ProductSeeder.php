<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $products = json_decode(file_get_contents("./public/products.json"), true);

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'model' => $product['model'],
                'price' => $product['price'],
                'category' => $product['category'],
                'product_image' => $product['product_image'],
                'specifications' => $product['Specifications'],
                'description' => $product['description'],
            ]);
        }

    }
}

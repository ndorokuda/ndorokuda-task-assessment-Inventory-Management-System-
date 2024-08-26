<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Supplier;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Kudakwashe',
            'last_name' => 'Kudakwashe',
            'email' => 'test@example.com',
        ]);

        // Product::factory(50)->create();
        // Supplier::factory(50)->create();
        // Category::factory(50)->create();
        // Order::factory(50)->create();
        // Sale::factory(50)->create();

    }
}

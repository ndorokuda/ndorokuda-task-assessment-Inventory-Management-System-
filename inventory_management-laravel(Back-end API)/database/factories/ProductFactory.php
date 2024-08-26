<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=> fake()->name(),
            'qauntity'=> fake()->numberBetween(1,100),
            'unit_price'=> fake()->randomFloat(2,3,100),
            'description'=> fake()->paragraph(1),
            // 'user_id'=>fake()->numberBetween(1,5),
            // 'category_id'=>fake()->numberBetween(1,100),
            // 'supplier_id'=>fake()->numberBetween(1,100),
        ];
    }
}

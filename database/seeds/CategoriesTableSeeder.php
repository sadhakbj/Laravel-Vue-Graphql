<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Categories.
     *
     * @var array
     */
    protected $categories = [
        'Marketting',
        'Business',
        'Finance',
        'Entrepreneurship',
        'Science',
        'Biography'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->categories as $category) {
            app(Category::class)->create(['name' => $category]);
        }
    }
}

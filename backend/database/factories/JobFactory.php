<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition()
    {
        return [
            "title" => $this->faker->title(),
            "is_check" => $this->faker->boolean(),
            "is_check_enterprise" => $this->faker->boolean(),
            "date" => $this->faker->boolean()? $this->faker->dateTimeBetween('now', '+1 years'): $this->faker->date(),
            "in_time" => $this->faker->time(),
            "out_time" => $this->faker->time(),
        ];
    }
}

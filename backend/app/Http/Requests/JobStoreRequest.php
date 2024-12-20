<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "description" => ["required", "string"],
            "is_check" => ["boolean"],
            "date" => ["required", "date", 'date_format:Y-m-d', 'after_or_equal:' . now()->toDateString()],
            "in_time" => ["required", 'date_format:H:i'],
            "out_time" => ["required", 'date_format:H:i'],
            'enterprise_id' => ["required", "exists:enterprises,id"],
        ];
    }
}

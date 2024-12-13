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
            "title" => ["required", "string"],
            "is_check" => ["boolean"],
            "is_check_enterprise" => ["boolean"],
            "date" => ["required", "date", 'date_format:Y-m-d'],
            "in_time" => ["required", 'date_format:H:i'],
            "out_time" => ["required", 'date_format:H:i'],
            'enterprise_id' => ["required", "exists:enterprises,id"],
        ];
    }
}

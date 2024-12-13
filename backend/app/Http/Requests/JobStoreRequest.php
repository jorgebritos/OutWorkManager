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
            "date" => ["required", "date"],
            "in_time" => ["required", "time"],
            "out_time" => ["required", "time"],
            'enterprise_id' => ["required", "exists:enterprises,id"],
        ];
    }
}

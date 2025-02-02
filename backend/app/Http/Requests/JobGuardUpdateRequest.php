<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class JobGuardUpdateRequest extends FormRequest
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
            "in_datetime_confirm" => ["date_format:Y-m-d H:i"],
            "out_datetime_confirm" => ["date_format:Y-m-d H:i"]
        ];
    }

 
    public function prepareForValidation()
    {
        if ($this->has('in_datetime_confirm') || $this->has('out_datetime_confirm')) {
            $this->merge([
                'in_datetime_confirm' => Carbon::parse($this->input('in_datetime_confirm'))->format('Y-m-d H:i'),
                'out_datetime_confirm' => Carbon::parse($this->input('out_datetime_confirm'))->format('Y-m-d H:i'),
            ]);
        }
    }
}

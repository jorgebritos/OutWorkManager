<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => 'image',
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email',
            'password' => 'string|min:8',
            'confirm_password' => 'string|min:8|same:password',
            'rol' => 'string|in:Admin,Enterprise,Guard',
        ];
    }
}

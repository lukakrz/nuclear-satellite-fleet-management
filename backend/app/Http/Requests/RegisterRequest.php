<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_name' => 'required|string',
            'email' => 'required|string|max:255|unique:users,email',
            'password' => [
                'required',
                Password::min(6)
                    ->numbers()
                    ->symbols()
            ],
            'origin' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'user_name.required' => 'Nazwa użytkownika jest wymagana',
            'email.required' => 'Email jest wymagany',
            'email.unique' => 'Podany adres email jest już zajęty',
            'email.max' => 'Email nie może mieć więcej niż 255 znaków',
            'password.required' => 'Hasło jest wymagane',
            'password.min' => 'Hasło musi mieć conajmniej 6 znaków',
            'origin.required' => 'Pochodzenie jest wymagane',
        ];
    }
}

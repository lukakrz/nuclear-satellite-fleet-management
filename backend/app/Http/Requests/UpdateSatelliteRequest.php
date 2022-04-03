<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSatelliteRequest extends FormRequest
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
            'side_number' => 'required|string',
            'manufacturer' => 'required|string',
            'model' => 'required|string',
            'current_version' => 'required|string',
            'year' => 'required|digits:4|integer|min:1900|max:' . (date('Y')),
            'lanuched_at' => 'required|date_format:Y-m-d',
            'ammount_ammo' => 'required|integer',
            'orbit_altitude' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'side_number.required' => 'Numer boczny jest wymagany',
            'manufacturer.required' => 'Producent jest wymagany',
            'model.required' => 'Model jest wymagany',
            'current_version.required' => "Wersja oprogramowania jest wymagana",
            'year.required' => 'Rok produkcji jest wymagany',
            'year.digits' => 'Rok produkcji musi posiadać 4 cyfry',
            'year.integer' => 'Rok produkcji musi być liczbą',
            'year.min' => '\'Rok produkcji nie może być mniejszy niż 1900 rok',
            'year.max' => 'Rok produkcji nie może być większy niż ' . (date('Y')) . ' rok',
            'lanuched_at.required' => 'Data wystrzelenia na orbitę jest wymagana',
            'lanuched_at.date_format' => 'Data wystrzelenia na orbitę jest wymagana',
            'ammount_ammo.required' => 'Ilość amunicji jest wymagana',
            'ammount_ammo.integer' => 'Ilość amunicji musi być liczbą',
            'orbit_altitude.required' => 'Wysokość na orbicie jest wymagana',
            'orbit_altitude.integer' => 'Wysokość na orbicie musi być liczbą',
        ];
    }
}

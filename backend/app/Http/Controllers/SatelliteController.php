<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSatelliteRequest;
use App\Http\Requests\UpdateSatelliteRequest;
use App\Models\Satellite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class SatelliteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Satellite::where('user_id', Auth::id())->paginate(5);
        // return Satellite::paginate(5);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSatelliteRequest $request)
    {
        $request->validated();
        $satellite = Satellite::create($request->all() + ['user_id' => Auth::id()]);

        return $satellite;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Satellite::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSatelliteRequest $request, $id)
    {
        $request->validated();
        $satellite = Satellite::find($id);
        $satellite->updated_at = Carbon::now();
        $satellite->update($request->all());

        return $satellite;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Satellite::destroy($id);

        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TrixFileUploadController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->file('upload')) {
            $path = $request->upload->store('trix-file');

            return response()->json([
                'url' => '/storage/' . $path
            ], 200);
        }

        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        if ($request->has('file')) {
            $file = 'trix-file/' . $request->file;
            $exists = Storage::exists($file);
            if ($exists) {
                Storage::delete($file);

                return response()->json('Deleted', 200);
            }
        }
    }
}

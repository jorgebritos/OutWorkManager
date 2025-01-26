<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\OperatorDocumentResource;
use App\Models\Document;
use App\Models\Enterprise;
use App\Models\Operator;
use App\Http\Requests\DocumentStoreRequest;
use App\Http\Requests\DocumentUpdateRequest;
use App\Http\Resources\Pagination\OperatorDocumentsPaginatedCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class OperatorDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Enterprise $enterprise, Operator $operator, Request $request)
    {
        Gate::authorize("view", $enterprise);
        Gate::authorize("view", $operator);

        $query = $operator->documents();

        $search = $request->input('search', null);

        if ($search !== null) {
            $query->where('title', 'LIKE', "%{$search}%");
        }
        $documents = $query->orderBy("created_at", "desc")->paginate(5);

        return response()->json(new OperatorDocumentsPaginatedCollection($documents));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Enterprise $enterprise, Operator $operator, DocumentStoreRequest $request)
    {
        Gate::authorize("view", $enterprise);
        Gate::authorize("view", $operator);

        $request->validated();

        $path = "storage/" . $request->file('document')->store('documents', 'public');

        $document = $operator->documents()->create([
            'url_document' => $path,
            'title' => $request->input('title'),
            'expire' => $request->input('expire'),
            'is_valid' => $request->input('is_valid', false),
        ]);

        return response()->json(["document" => OperatorDocumentResource::make($document)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Enterprise $enterprise, Operator $operator, Document $document)
    {
        Gate::authorize("view", $enterprise);
        Gate::authorize("view", $operator);
        Gate::authorize("view", $document);

        return response()->json(["document" => OperatorDocumentResource::make($document)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Enterprise $enterprise, Operator $operator, Document $document, DocumentUpdateRequest $request)
    {
        Gate::authorize("view", $enterprise);
        Gate::authorize("view", $operator);
        Gate::authorize("update", $document);

        $data = $request->validated();

        if ($request->hasFile('document')) {
            $data["url_document"] = "storage/" . $request->file('document')->store('documents', 'public');
        }

        $document->update($data);

        return response()->json(["document" => OperatorDocumentResource::make($document)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enterprise $enterprise, Operator $operator, Document $document)
    {
        Gate::authorize("view", $enterprise);
        Gate::authorize("view", $operator);
        Gate::authorize("delete", $document);

        $document->delete();

        return response()->json();
    }
}

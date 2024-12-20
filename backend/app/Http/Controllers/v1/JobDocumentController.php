<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DocumentStoreRequest;
use App\Http\Requests\DocumentUpdateRequest;
use App\Http\Resources\JobDocumentResource;
use App\Http\Resources\Pagination\JobDocumentPaginatedCollection;
use App\Models\Document;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class JobDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Job $job, Request $request)
    {
        Gate::authorize("view", $job);

        $query = $job->documents();

        $search = $request->input('search', null);

        if ($search !== null) {
            $query->where('title', 'LIKE', "%{$search}%");
        }

        $documents = $query->orderBy("created_at", "desc")->paginate(5);

        return response()->json(new JobDocumentPaginatedCollection($documents));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Job $job, DocumentStoreRequest $request)
    {
        Gate::authorize("view", $job);

        $request->validated();

        $path = $request->file('document')->store('documents', 'public');

        if ($request->hasFile('document')) {
            $data['document'] = "storage/" . $request->file('document')->store('documents', 'public');
        }

        $document = $job->documents()->create([
            'url_document' => $path,
            'title' => $request->input('title'),
            'expire' => $request->input('expire'),
            'is_valid' => $request->input('is_valid', false),
        ]);

        return response()->json(["document" => JobDocumentResource::make($document)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job, Document $document)
    {
        Gate::authorize("view", $job);
        Gate::authorize("view", $document);
        
        return response()->json(["document" => JobDocumentResource::make($document)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Job $job, DocumentUpdateRequest $request, Document $document)
    {
        Gate::authorize("view", $job);
        Gate::authorize("update", $document);
    
        $data = $request->validated();

        $path = null;

        if ($request->file("document")) {
            $path = $request->file('document')->store('documents', 'public');
            $data["document_url"] = $path;
        }

        $document->update($data);

        return response()->json(["document" => JobDocumentResource::make($document)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job, Document $document)
    {
        Gate::authorize("view", $job);
        Gate::authorize("delete", $document);
        
        $document->delete();

        return response()->json();
    }
}

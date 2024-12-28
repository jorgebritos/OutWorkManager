<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobStoreRequest;
use App\Http\Requests\JobUpdateRequest;
use App\Http\Resources\JobResource;
use App\Http\Resources\Pagination\JobPaginatedCollection;
use App\Models\Enterprise;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        // uso las politicas de empresas para que
        // solo el admin pueda usar estre controllador
        Gate::authorize('viewAny', Enterprise::class);
        
        $query = Job::query();

        $valid = $request->input('valid');

        if ($valid === 'true') {
            $now = Carbon::now();

            $query->where(function ($q) use ($now) {
                $q->where(DB::raw("CONCAT(date, ' ', in_time)"), '>', $now->toDateTimeString());
            });

        } else if ($valid === 'false') {
            $now = Carbon::now();

            $query->where(function ($q) use ($now) {
                $q->where(DB::raw("CONCAT(date, ' ', in_time)"), '<', $now->toDateTimeString());
            });
        }

        $confirm = $request->input('confirm');

        if ($confirm === 'true') {
            $query->where('is_check', true);
        } else if ($confirm === 'false') {
            $query->where('is_check', false);
        }

        $search = $request->input('search', null);

        if ($search !== null) {
            $query->where('description', 'LIKE', "%{$search}%");
        }

        $jobs = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json(new JobPaginatedCollection($jobs));
    }

    public function show(Job $job)
    {
        Gate::authorize('viewAny', Enterprise::class);
        return response()->json(['job' => JobResource::make($job)]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(JobStoreRequest $request)
    {
        Gate::authorize('viewAny', Enterprise::class);
        $data =  $request->validated();

        $job = Job::create($data);

        return response()->json(JobResource::make($job), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobUpdateRequest $request, Job $job)
    {
        Gate::authorize('viewAny', Enterprise::class);
        $data = $request->validated();

        $job->update($data);

        return response()->json(JobResource::make($job));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        Gate::authorize('viewAny', Enterprise::class);
        $job->delete();

        return response()->json();
    }
}

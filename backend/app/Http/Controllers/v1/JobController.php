<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobStoreRequest;
use App\Http\Requests\JobUpdateRequest;
use App\Http\Resources\JobResource;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {

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
                $q->whereDate('date', '<', $now->toDateString())
                    ->orWhere(function ($q2) use ($now) {
                        $q2->whereDate('date', '=', $now->toDateString())
                            ->whereTime('in_time', '<', $now->toTimeString());
                    });
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
            $query->where('title', 'LIKE', "%{$search}%");
        }

        $jobs = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            "jobs" => JobResource::collection($jobs),
        ]);
    }

    public function show(Job $job)
    {
        return response()->json(JobResource::make($job));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(JobStoreRequest $request)
    {
        $data =  $request->validated();

        $job = Job::create($data);

        return response()->json(JobResource::make($job), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobUpdateRequest $request, Job $job)
    {
        $data = $request->validated();

        $job->update($data);

        return response()->json(JobResource::make($job));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json();
    }
}

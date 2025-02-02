<?php

namespace App\Http\Controllers\v1;

use App\Events\NotificationSent;
use App\Http\Controllers\Controller;
use App\Http\Requests\JobStoreRequest;
use App\Http\Requests\JobUpdateRequest;
use App\Http\Resources\JobResource;
use App\Http\Resources\Pagination\JobPaginatedCollection;
use App\Models\Job;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        Gate::authorize('viewAdmin', Job::class);

        $query = Job::query();

        $valid = $request->input('valid');

        if ($valid === 'true') {
            $now = Carbon::now();
            $query->where("in_datetime", '>', $now->toDateTimeString());
        } else if ($valid === 'false') {
            $now = Carbon::now();
            $query->where(function ($q) use ($now) {
                $q->where(DB::raw("in_datetime"), '<', $now->toDateTimeString());
            });
        }

        $confirm = $request->input('confirm');

        if ($confirm) {
            $query->where('is_check', $confirm === 'true');
        }

        $search = $request->input('search', null);

        if ($search !== null) $query->where('description', 'LIKE', "%{$search}%");

        $jobs = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json(new JobPaginatedCollection($jobs));
    }

    public function show(Job $job)
    {
        Gate::authorize('viewAdmin', Job::class);

        return response()->json(['job' => JobResource::make($job)]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(JobStoreRequest $request)
    {
        Gate::authorize('viewAdmin', Job::class);

        $data =  $request->validated();


        $user = Auth::user();

        $job = Job::create($data);

        $notification = Notification::create([
            'content' => 'El/La Prevencionista ' . $user->name . ' programo un nuevo trabajo',
            'enterprise_id' => $data->enterprise_id
        ]);

        broadcast(new NotificationSent($notification));

        return response()->json(JobResource::make($job), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobUpdateRequest $request, Job $job)
    {
        Gate::authorize('viewAdmin', Job::class);

        $data = $request->validated();

        $job->update($data);

        return response()->json(JobResource::make($job));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        Gate::authorize('viewAdmin', Job::class);

        $job->delete();

        return response()->json();
    }
}

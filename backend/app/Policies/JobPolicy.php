<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\User;

class JobPolicy
{

    public function viewAdmin(User $user): bool
    {
        return $user->rol === 'Admin';
    }


    public function viewGuard(User $user): bool
    {
        return $user->rol === 'Guard';
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->rol === "Enterprise" || $user->rol = "Admin";
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Job $job): bool
    {
        return ($user->rol === "Enterprise" && $user->enterprise->id === $job->enterprise_id) || $user->rol === "Admin";
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return ($user->rol === "Enterprise" && !($user->enterprise())) || $user->rol === "Admin";
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Job $job): bool
    {
        return ($user->rol === "Enterprise" && $user->enterprise->id === $job->enterprise_id) || $user->rol === "Admin";
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Job $job): bool
    {
        return ($user->rol === "Enterprise" && $user->enterprise->id === $job->enterprise_id) || $user->rol === "Admin";
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Enterprise $enterprise): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Enterprise $enterprise): bool
    {
        //
    }
}

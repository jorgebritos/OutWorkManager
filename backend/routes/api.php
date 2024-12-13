<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\v1\JobController;
use App\Http\Controllers\Auth\AuthController;

use App\Http\Controllers\v1\EnterpriseController as V1EnterpriseController;
use App\Http\Controllers\v1\JobController as V1JobController;
use App\Http\Controllers\v1\OperatorController as V1OperatorController;
use App\Http\Controllers\v1\UserController as V1UserController;
use App\Http\Controllers\v1\EnterpriseDocumentController as V1EnterpriseDocumentController;
use App\Http\Controllers\v1\OperatorDocumentController as V1OperatorDocumentController;
use App\Http\Controllers\v1\JobDocumentController as V1JobDocumentController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, "me"]);

    Route::apiResource("/enterprises", V1EnterpriseController::class);
    Route::prefix("/enterprises/{enterprise:slug}")->group(function () {
        Route::apiResource("/documents", V1EnterpriseDocumentController::class);
        Route::apiResource("/operators", V1OperatorController::class);
        Route::prefix("/operators/{operator:id}")->group(function () {
            Route::apiResource("/documents", V1OperatorDocumentController::class)->names("operators.documents");
        });
    });

    Route::apiResource("/jobs", V1JobController::class);
    Route::prefix("jobs/{job:id}")->group(function () {
        Route::apiResource("/documents", V1JobDocumentController::class)->names("jobs.documents");
    });

    Route::apiResource("/users", V1UserController::class)->except(["show"]);


});

Route::middleware(["guest"])->prefix("auth/")->group(function () {
    Route::post("register/", [AuthController::class, "register"]);
    Route::post("login/", [AuthController::class, "login"]);
});

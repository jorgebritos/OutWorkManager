<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:api']]);

Broadcast::channel('chat.{receiverId}', function ($user, $receiverId) {
    return true;
});


<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'enterprise' => 'required|exists:enterprises,id',
            'content' => 'required|string',
        ]);

        $message = Notification::create([
            'enterprise_id' => $validated['enterprise'],
            'content' => $validated['content'],
        ]);

        //broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }

    public function getMessages()
    {
        $notifications = Notification::orderBy('created_at', 'desc')->get();

        return response()->json($notifications);
    }
}

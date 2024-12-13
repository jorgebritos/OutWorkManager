<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "title" => $this->title,
            "is_check" => !!($this->is_check),
            "is_check_enterprise" => !!($this->is_check_enterprise),
            "date" => $this->date,
            "in_time" => $this->in_time,
            "out_time" => $this->out_time,
            'enterprise' => $this->enterprise->nombre,
        ];
    }
}

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
            "description" => $this->description,
            "is_check" => !!($this->is_check),
            "is_check_enterprise" => !!($this->is_check_enterprise),
            "in_datetime" => $this->in_datetime,
            "in_datetime_confirm" => $this->in_datetime_confirm,
            "out_datetime" => $this->out_datetime,
            "out_datetime_confirm" => $this->out_datetime_confirm,
            'enterprise' => $this->enterprise->nombre,
        ];
    }
}

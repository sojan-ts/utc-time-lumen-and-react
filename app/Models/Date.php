<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    protected $table = 'dates';
    protected $primaryKey = 'id';
    protected $fillable = ['utc_date'];
}

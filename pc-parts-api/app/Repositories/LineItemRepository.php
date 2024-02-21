<?php


namespace App\Repositories;

use App\Models\LineItem;

class LineItemRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     *
     * @param LineItem $lineItem
     * @return void
     */
    public function __construct(LineItem $lineItem)
    {
        $this->model = $lineItem;
    }
}

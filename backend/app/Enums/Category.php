<?php

namespace App\Enums;

enum Category: string
{
    case EVENT = 'event';
    case FUNDRAISING = 'fundraising';
    case WORKSHOP = 'workshop';
    case INDIVIDUAL_SUPPORT = 'individual_support';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::EVENT => 'Wydarzenie',
            self::FUNDRAISING => 'Zbiórka',
            self::WORKSHOP => 'Edukacja / Warsztaty',
            self::INDIVIDUAL_SUPPORT => 'Wsparcie indywidualne',
            self::OTHER => 'Inne',
        };
    }
}

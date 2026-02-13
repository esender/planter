---
name: add-plant
description: Add a new plant page by researching accurate care information from the web and creating a properly formatted markdown file
---

## Task

Add a new plant page to the RQooted plant care tracking website.

## Requirements

### Plant Name Specificity

- Always use the **specific cultivar or variety name**, not generic names
- Good: "Stromanthe Triostar", "Monstera Deliciosa", "Philodendron Pink Princess"
- Bad: "Stromanthe", "Monstera", "Philodendron"
- Include the scientific name (genus species) when available, e.g., *Stromanthe sanguinea* 'Triostar'

### Recommended Research Sources

Use these authoritative websites for accurate plant care information:

1. **RHS (Royal Horticultural Society)** - https://www.rhs.org.uk/plants
   - UK's leading gardening charity with scientific authority
   - Comprehensive plant database with detailed care guides
   - Use the plant search: `https://www.rhs.org.uk/plants/search-form?query=<plant-name>`

2. **The Spruce (Houseplants)** - https://www.thespruce.com/houseplants-4127735
   - Popular home and garden site with detailed houseplant care articles
   - Practical, beginner-friendly care instructions
   - Use site search: `https://www.thespruce.com/search?q=<plant-name>+houseplant`

3. **Houseplant411** - https://www.houseplant411.com/
   - Dedicated houseplant identification and care website
   - Includes pictures, watering guides, and troubleshooting tips
   - Use the plant wizard or browse by plant name

4. **Garden.org (National Gardening Association)** - https://garden.org/plants/
   - Community-driven plant database with 800K+ plants
   - Real-world growing experiences from gardeners
   - Use text search: `https://garden.org/plants/search/text.php`

### Research Process

1. Search the recommended sources above for the specific plant
2. Cross-reference at least 2-3 sources for accuracy
3. Prioritize RHS for scientific accuracy, The Spruce for practical care, Houseplant411 for detailed guides
4. Verify care requirements are consistent across sources
5. When sources conflict, defer to RHS or botanical garden authority

### File Creation

Create a new file at `src/content/plants/<slug>.md` where `<slug>` is a kebab-case version of the plant name.

### Frontmatter Schema

```yaml
---
title: string          # Full plant name (e.g., "Monstera Deliciosa")
image: string          # Path like "/images/plant-name.webp" (optional)
water: enum            # One of: daily, weekly, biweekly, monthly, rarely, keep moist
lightAmount: enum      # One of: low, medium, bright
lightType: enum        # One of: direct, indirect
difficulty: enum       # One of: easy, medium, hard
toxicity: enum         # One of: toxic, non-toxic, unknown
humidity: enum         # One of: low, medium, high (optional)
fertilizer: enum       # One of: monthly, biweekly, rarely, none (optional)
origin: string         # Native region e.g., "Brazil", "Southeast Asia" (optional)
growthRate: enum       # One of: slow, medium, fast (optional)
---
```

### Content Structure

Follow the format of existing plant pages. Include relevant sections:

1. **Brief introduction** - Native region, plant family, notable characteristics
2. **Light** - Specific light requirements with window recommendations
3. **Water** - Watering frequency, signs of over/under watering
4. **Temperature & Humidity** - Use metric first with imperial in parentheses: 18-27°C (65-80°F)
5. **Soil** - Recommended soil mix composition
6. **Toxicity** - Note if toxic or non-toxic to pets

### Example Output

```markdown
---
title: "Philodendron Pink Princess"
image: "/images/philodendron-pink-princess.webp"
water: "weekly"
lightAmount: "medium"
lightType: "indirect"
difficulty: "medium"
toxicity: "toxic"
humidity: "medium"
fertilizer: "monthly"
origin: "South America"
growthRate: "medium"
---

The Philodendron Pink Princess (*Philodendron erubescens* 'Pink Princess') is a rare tropical aroid prized for its stunning variegated foliage with pink patches on dark green leaves. Native to South America, this hybrid cultivar has become highly sought after by plant collectors.

## Light

Thrives in medium to bright indirect light. Too little light reduces variegation; direct sun can burn the pink portions. An east-facing window is ideal.

## Water

Water when the top 2 inches of soil are dry. Typically weekly in summer, every 10-14 days in winter. Yellow leaves indicate overwatering.

## Temperature & Humidity

Prefers 18-29°C (65-85°F). Avoid temperatures below 15°C (60°F). Benefits from 50-70% humidity—mist regularly or use a pebble tray.

## Soil

Use a well-draining aroid mix: peat moss, perlite, and orchid bark in equal parts.

## Toxicity

Toxic to cats and dogs if ingested. Contains calcium oxalate crystals that cause oral irritation.
```

## Workflow

1. Ask the user for the specific plant name
2. Research the plant using web search
3. Verify information accuracy across multiple sources
4. Draft the markdown content
5. Create the file at the correct location
6. Run `npm run astro sync` to update content collection types

## Quality Checklist

Before completing, verify:
- [ ] Plant name is specific (cultivar/variety, not generic)
- [ ] Scientific name is included in the introduction
- [ ] All frontmatter fields are valid enum values
- [ ] Temperature uses metric with imperial in parentheses
- [ ] Toxicity field is set (important for pet owners)
- [ ] Care information is accurate and cross-referenced
- [ ] Content follows the established format

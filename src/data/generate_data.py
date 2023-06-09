import json
import requests

only = ["Sun", "Mercury", "Venus", "Earth", "Moon", "Mars",
        "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
        "1 Ceres", "Io", "Ganymede", "Europa", "Callisto"]
wiki_corrections = {
    'io': 'io_moon',
    'ganymede': 'ganymede_moon',
    'europa': 'europa_moon',
    'callisto': 'callisto_moon'
}
photo_credits = {
    'mercury': {
        'cc': 'Unsplash',
        'by': 'NASA'
    },
    'venus': {
        'cc': 'Public Domain',
        'by': 'NASA/JPL-Caltech'
    },
    'earth': {
        'cc': 'Unsplash',
        'by': 'ANIRUDH'
    },
    'moon': {
        'cc': 'Unsplash',
        'by': 'NASA'
    },
    'mars': {
        'cc': 'Unsplash',
        'by': 'Planet Volumes'
    },
    'jupiter': {
        'cc': 'Unsplash',
        'by': 'Planet Volumes'
    },
    'ganymede': {
        'cc': 'CC BY 2.0',
        'by': 'NASA/JPL-Caltech/SwRI/MSSS/Kevin M. Gill'
    },
    'europa': {
        'cc': 'CC BY 2.0',
        'by': 'NASA/JPL-Caltech/SwRI/MSSS/Kevin M. Gill'
    },
    'callisto': {
        'cc': 'CC BY 2.0',
        'by': 'NASA/JPL-Caltech/Kevin M. Gill'
    },
    'io': {
        'cc': 'Public Domain',
        'by': 'NASA / JPL / University of Arizona'
    },
    'saturn': {
        'cc': 'Unsplash',
        'by': 'NASA'
    },
    'uranus': {
        'cc': 'Unsplash',
        'by': 'Planet Volumes'
    },
    'neptune': {
        'cc': 'Unsplash',
        'by': 'Planet Volumes'
    },
    'pluto': {
        'cc': 'Unsplash',
        'by': 'NASA'
    }
}
types = {
    **dict.fromkeys(['sun'], 'Star'),
    **dict.fromkeys(['mercury', 'venus', 'earth', 'mars'], 'Terrestrial'),
    **dict.fromkeys(['jupiter', 'saturn'], 'Gas Giant'),
    **dict.fromkeys(['uranus', 'neptune'], 'Ice Giant'),
    **dict.fromkeys(['pluto', '1 ceres'], 'Dwarf Planet'),
    **dict.fromkeys(['moon', 'io', 'ganymede', 'europa', 'callisto'], 'Satellite')
}

# Solar System API

f = open('src/data/raw_data.json')
data = json.load(f)

translation = {
    'la lune': 'moon',
    'uranus': 'uranus',
    'pluton': 'pluto',
    'neptune': 'neptune',
    'jupiter': 'jupiter',
    'mars': 'mars',
    'mercure': 'mercury',
    'saturne': 'saturn',
    'le soleil': 'sun',
    'terre': 'earth',
    'vénus': 'venus',
    '(1) Cérès': 'ceres',
    'io': 'io',
    'ganymede': 'ganymede',
    'europe': 'europa',
    'callisto': 'callisto'
}

json_dump = {}
for i in data['bodies']:
    name = str(i['englishName'])
    name_key = str(i['englishName']).lower()
    if (name in only):
        json_dump[name_key] = i
        json_dump[name_key]['id'] = name_key
        json_dump[name_key]['name'] = name
        json_dump[name_key]['type'] = types[name_key]
        parent = json_dump[name_key]['aroundPlanet']
        if (parent is not None):
            around = str(json_dump[name_key]['aroundPlanet']['planet'])
            json_dump[name_key]['aroundPlanet']['planet'] = translation[around]

f.close()

json_object = json.dumps(json_dump, indent=4)
with open("src/data/objects.json", "w") as outfile:
    outfile.write(json_object)

# Wikipedia

wikipedia_json_object = {}
for planet in only:
    planet_url = planet if planet.lower(
    ) not in wiki_corrections else wiki_corrections[planet.lower()]
    wiki_url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + planet_url
    response = requests.get(wiki_url)
    if response.ok:
        wikipedia_json_object[planet] = response.json()
    if planet.lower() in photo_credits:
        wikipedia_json_object[planet]["photo_credits"] = photo_credits[planet.lower(
        )]

# print(wikipedia_json_object)

json_object = json.dumps(wikipedia_json_object, indent=4)
with open("src/data/wiki.json", "w") as outfile:
    outfile.write(json_object)

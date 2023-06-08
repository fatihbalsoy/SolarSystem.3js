import json
import requests

only = ["Sun", "Mercury", "Venus", "Earth", "Moon", "Mars",
        "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
        "1 Ceres", "Io", "Ganymede", "Europa", "Callisto"]

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
    wiki_url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + planet
    response = requests.get(wiki_url)
    if response.ok:
        wikipedia_json_object[planet] = response.json()

# print(wikipedia_json_object)

json_object = json.dumps(wikipedia_json_object, indent=4)
with open("src/data/wiki.json", "w") as outfile:
    outfile.write(json_object)

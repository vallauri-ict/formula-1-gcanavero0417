# WebServices

The WebServices are based on ASP.net Web Api 2.0 and are accessible with the prefix `/api/`.

## Countries

### `/api/countries`
Returns all countries

    [
		{ 
			CountryCode,
			CountryName
		},
		{ Country },
	]

### `/api/countries/<id>`
Returns specific country by id

    { 
		CountryCode,
		CountryName
	}
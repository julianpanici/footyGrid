import requests
from bs4 import BeautifulSoup
import pandas as pd
standings_url = "https://fbref.com/en/comps/22/Major-League-Soccer-Stats"
data = requests.get(standings_url)
soup = BeautifulSoup(data.text)
standings_table = soup.select('table.stats_table')[0]
links = standings_table.findAll('a')
links = [l.get("href") for l in links]
links = [l for l in links if '/squads/' in l]
team_urls = [f"https://fbref.com{l}" for l in links]
print(team_urls)
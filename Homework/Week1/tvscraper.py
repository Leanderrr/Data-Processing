#!/usr/bin/env python
# Name: Leander de Kraker
# Student number: 10423354
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv
import re
from pattern.web import URL, DOM

TARGET_URL = URL("http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series")
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'
dom = DOM(TARGET_URL.download(cached=True))

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).
	
    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.
	# requested elements in: 
    # <main>-><article>
    #   <div class="lister list detail sub-list">
    #       <div class="lister-list">
    #           <div class="lister-item mode-advanced">
    #               <div class="lister-item-content"> ALL SERIE ENTRIES
    #                   <h3 class="lister-item-header"> 
    #                       <a href="/title/tblabla">             TITLE
    #                   <p class="text-muted">
    #                       <span class="runtime">bla</span>    RUNTIME
    #                       <span class="genre">                  GENRE
    #                   <span class="ratings-bar">
    #                        <div class="inline-block ratings-imdb-rating">
    #                           <strong>RATING</strong>          RATING
    #                   <p class>
    #                        <a href=><>                     STAR NAME1
    #                        <a href=><>                     STAR NAME2
    #
    titles = []
    genres = []
    actors  = []
    ratings = []
    rtimes = []    
    series = []
    
    # Get the desired data from the html page
    for serie in dom("div.lister-item-content"):
        # title
        for header in serie("h3.lister-item-header"):
            title = header.by_tag('a')[0].content
            titles.append(title.encode('utf-8'))
        # rating  
        rating = serie.by_tag("span.value")[0].content
        ratings.append(rating.encode('utf-8'))
        # genres
        genre = serie.by_tag("span.genre")[0].content
        genre = '"%s"' % genre.encode('utf-8').strip()
        genres.append(genre)
        # actors
        actorlist = serie[9].content
        actorlist = re.findall('">(.*)</a>',actorlist.encode('utf-8')) # get list of actors
        actorlist = '"%s"' % ', '.join(actorlist) # convert list to one string with quotation marks
        actors.append(actorlist)
        # runtime
        rtime = serie.by_tag("span.runtime")[0].content
        rtimes.append(rtime.encode('utf-8').strip('minhour '))
    
    # store the requested parts toghether per serie
    for i in range(len(titles)):
        series.append("%s,%s,%s,%s,%s" % (titles[i], ratings[i], genres[i], actors[i], rtimes[i]))
    
    return series


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    for serie in tvseries:
        writer.writerow([serie])

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
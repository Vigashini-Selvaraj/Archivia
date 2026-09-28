import os
import re
import shutil
import urllib.parse

# 1. Copy blog-details.html to news-details.html
shutil.copy('blog-details.html', 'news-details.html')

# 2. Update news-details.html title and breadcrumbs
with open('news-details.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<title>Blog Details | Archivia</title>', '<title>News Details | Archivia</title>')

with open('news-details.html', 'w', encoding='utf-8') as f:
    f.write(content)

# 3. Update news.html to add "Read Full Story" links with URL parameters
with open('news.html', 'r', encoding='utf-8') as f:
    news_html = f.read()

# For the featured article:
featured_regex = r'(<article class="featured-story filter-item".*?<h2>(.*?)</h2>.*?<a href=)"#"( class="read-more-btn">Read Full Story)'
def featured_repl(match):
    prefix = match.group(1)
    title = match.group(2)
    suffix = match.group(3)
    
    title_enc = urllib.parse.quote(title)
    cat_enc = urllib.parse.quote("Business")
    img_enc = urllib.parse.quote("https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80")
    
    return f'{prefix}"news-details.html?title={title_enc}&cat={cat_enc}&img={img_enc}"{suffix}'

news_html = re.sub(featured_regex, featured_repl, news_html, flags=re.DOTALL)

# For sub-articles:
sub_article_regex = r'(<article class="sub-article filter-item" data-category="[^"]*">\s*<img src="([^"]*)" alt="[^"]*">\s*<span class="article-cat">([^<]*)</span>\s*<h3>([^<]*)</h3>\s*<p>.*?</p>)\s*(?=</article>)'

def sub_article_repl(match):
    content_block = match.group(1)
    img = match.group(2)
    cat = match.group(3)
    title = match.group(4)
    
    title_enc = urllib.parse.quote(title)
    cat_enc = urllib.parse.quote(cat)
    img_enc = urllib.parse.quote(img)
    
    # Avoid duplicates
    if 'Read Full Story' in content_block:
        return content_block
        
    link = f'\n                    <br><a href="news-details.html?title={title_enc}&cat={cat_enc}&img={img_enc}" class="read-more-btn" style="margin-top:1rem; font-size:0.9rem;">Read Full Story <i class="fa-solid fa-arrow-right"></i></a>'
    return f'{content_block}{link}\n                '

news_html = re.sub(sub_article_regex, sub_article_repl, news_html, flags=re.DOTALL)

with open('news.html', 'w', encoding='utf-8') as f:
    f.write(news_html)

print("Done updating news")

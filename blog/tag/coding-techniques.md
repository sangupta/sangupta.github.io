---
layout: default
for_tag: coding-techniques
---

{% if site.posts.size > 0 %}
    <div class="list-group">
        {% for post in site.posts %}
        {% for tag in post.tags %}
        {% if tag == 'coding-techniques' %}
            <a href="{{ post.url }}" class="list-group-item">
                <h4 class="list-group-item-heading">{{ post.title }}<small> &ndash; <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b. %d, %Y' }}</time></small></h4>
            </a>
        {% endif %}
        {% endfor %}
        {% endfor %}
    </div>
    <a href="/blog/" class="pull-right">more <i class="fa fa-long-arrow-right"></i></a>
{% else %}
    <p>No posts found.</p>
{% endif %}


"""
ADMIN — registers models so they show up in Django Adm

add list_display, search_fields to make admin nicer.
STRUCTURE: OF ADMIN PAGE

"""



from django.contrib import admin

admin.site.site_header = "Historic District – Admin "
admin.site.site_title = "Historic District"
admin.site.index_title = "Administration"
admin.site.empty_value_display = "-empty-"
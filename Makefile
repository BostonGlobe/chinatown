R:

	Rscript -e "rmarkdown::render('data/chinatown.Rmd')"
	open data/chinatown.html

R_deploy:

	cp data/chinatown.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/chinatown_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/chinatown.html
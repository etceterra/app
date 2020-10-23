deploy:
	ssh ubuntu@app.naturapeute.ch '\
		cd ~/naturapeute/app && \
		git pull && \
		npm i && \
		npm run build \
	'

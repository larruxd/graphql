package main

import (
	"log"
	"net/http"
)

func main() {
	var port = "8080"
	startServer(port)
}

func startServer(port string) {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/static/index.html")
	})
	http.Handle("/web/", http.StripPrefix("/web/", http.FileServer(http.Dir("web"))))

	log.Println("Server running")
	log.Println("http://localhost:" + port)
	http.ListenAndServe(":"+port, nil)
}

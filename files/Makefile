TEX_COMPILER = tectonic
SOURCE = resume.tex

.PHONY: all clean

all: resume-en.pdf resume-es.pdf

resume-en.tex: $(SOURCE)
	cp $(SOURCE) $@

resume-en.pdf: resume-en.tex
	$(TEX_COMPILER) $<

resume-es.tex: $(SOURCE)
	sed '40s/\\entrue/\\estrue/' $(SOURCE) > $@

resume-es.pdf: resume-es.tex
	$(TEX_COMPILER) $<

clean:
	rm -f resume.pdf resume-en.tex resume-en.pdf resume-es.tex resume-es.pdf

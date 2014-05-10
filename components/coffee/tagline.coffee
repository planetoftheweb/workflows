$ = require 'jquery'

do fill = (item = 'The most creative minds in Art') ->
  $('.tagline').append "#{item}"
fill
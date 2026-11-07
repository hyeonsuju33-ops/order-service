
  end

  def self.resize(from, to, width, height, opts={})
    optimize("resize", from, to, width, height, opts)
  end

  def self.downsize(from, to, max_width, max_height, opts={})
    optimize("downsize", from, to, max_width, max_height, opts)
  end

  def self.optimize(operation, from, to, width, height, opts={})
    dim = dimensions(width, height)
    method_name = "#{operation}_instructions"
    method_name += "_animated" if !!opts[:allow_animation] && from =~ /\.GIF$/i
    instructions = self.send(method_name.to_sym, from, to, dim, opts)
    convert_with(instructions, to)
  end

  def self.dimensions(width, height)
    "#{width}x#{height}"
  end

  def self.convert_with(instructions, to)
    `#{instructions.join(" ")} &> /dev/null`
    return false if $?.exitstatus != 0

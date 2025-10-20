import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import dts from 'rollup-plugin-dts';

const config = [

  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve({extensions: ['.js', '.ts', '.tsx']}),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: true,
        declarationDir: 'dist', // 
      }),
      cleanup(),
    ],
    output: [
      {
        file: 'dist/react.js',
        format: 'esm',
        sourcemap: true,
        plugins: [filesize()],
      },
      {
        file: 'dist/react.min.js',
        format: 'esm',
        sourcemap: true,
        plugins: [terser(), filesize()],
      },
    ],
  },


  {
    input: 'dist/index.d.ts', 
    output: {
      file: 'dist/react.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;

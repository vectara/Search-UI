# prepare configuration file before building the docker
import sys
import yaml

def main(filename):
    
    config = yaml.load(open(filename), Loader=yaml.FullLoader)
    config['endpoint'] = 'api.vectara.io'

    # convert serving attributes to have REACT_APP prefix
    new_config = {}
    for k,v in config.items():
        new_config['REACT_APP_' + k] = v

    with open('.env', 'w') as f:
        for k in new_config.keys():
            f.write(f'{k}={new_config[k]}\n')

if __name__ == '__main__':
    filename = sys.argv[1]
    main(filename)